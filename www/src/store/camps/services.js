import { Handlers, Actions, payloads$ } from '../../rxdux'
import { FirebaseDb } from '../../firebase'

// subscribed always
FirebaseDb.ref('/camps/public').on('value', snapshot => Handlers.campsChangedPublic(snapshot.val()))

// resubscribed when owner role changes
payloads$(Actions.PROFILE_CHANGED).pluck('owner').distinctUntilChanged().subscribe(owner => {
  if (!owner) {
    FirebaseDb.ref('/camps/private').off()
    Handlers.removeCampsPrivate()
  } else {
    FirebaseDb.ref('/camps/private').on('value', snapshot => Handlers.campsChangedPrivate(snapshot.val()))
  }
})

// add empty camp requested
payloads$(Actions.ADD_EMPTY_CAMP)
  .subscribe(cid =>
    FirebaseDb
      .ref('camps/public').push({
        name: 'New camp'
      })
      .then(ref => FirebaseDb.ref('camps/private/' + ref.key).set({
        somekey: 'New secret'
      }))
      .then(() => Handlers.okUser('camps', 'New camp added'))
      .catch(err => Handlers.errorUser('camps', 'Camp not added', err))
  )

// add empty camp requested
payloads$(Actions.UPDATE_CAMP)
  .subscribe(camp =>
    FirebaseDb
      .ref('camps/public/' + camp.cid).set({
        name: camp.name
      })
      .then(() => FirebaseDb.ref('camps/private/' + camp.cid).set({
        somekey: camp.somekey
      }))
      .then(() => Handlers.okUser('camps', 'Camp updated'))
      .catch(err => Handlers.errorUser('camps', 'Camp not updated', err))
  )

// remove camp requested
payloads$(Actions.REMOVE_CAMP)
  .subscribe(cid =>
    FirebaseDb
      .ref('camps/public/' + cid).remove()
      .then(() => FirebaseDb.ref('camps/private/' + cid).remove())
      .then(() => Handlers.selectCamp())
      .then(() => Handlers.okUser('camps', 'Camp removed'))
      .catch(err => Handlers.errorUser('camps', 'Camp not removed', err))
  )
