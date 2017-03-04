import { Handlers, Actions, payloads$ } from '../../rxdux'
import { FirebaseDb } from '../../firebase'

// subscribed always
FirebaseDb.ref('/camps').on('value', snapshot => Handlers.campsChanged(snapshot.val()))

// add empty camp requested
payloads$(Actions.ADD_EMPTY_CAMP)
  .subscribe(cid =>
    FirebaseDb
      .ref('camps').push({
        name: 'New camp'
      })
      .then(() => Handlers.okUser('camps', 'New camp added'))
      .catch(err => Handlers.errorUser('camps', 'Camp not added', err))
  )

// update camp requested
payloads$(Actions.UPDATE_CAMP)
  .subscribe(camp =>
    FirebaseDb
      .ref('camps/' + camp.cid).set({
        name: camp.name
      })
      .then(() => Handlers.okUser('camps', 'Camp updated'))
      .catch(err => Handlers.errorUser('camps', 'Camp not updated', err))
  )

// remove camp requested
payloads$(Actions.REMOVE_CAMP)
  .subscribe(cid =>
    FirebaseDb
      .ref('camps/' + cid).remove()
      .then(() => Handlers.selectCamp())
      .then(() => Handlers.okUser('camps', 'Camp removed'))
      .catch(err => Handlers.errorUser('camps', 'Camp not removed', err))
  )
