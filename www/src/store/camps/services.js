import { Handlers, Actions, payloads$, store$ } from '../../rxdux'
import { FirebaseDb } from '../../firebase'

// subscribed always
FirebaseDb.ref('/camps').on('value', snapshot => Handlers.campsChanged(snapshot.val()))

// here will unsubscribe and subscribe to volunteer list when selectedCamp changes
store$.map(state => state.camps.selectedCamp).bufferCount(2, 1).filter(([lastSelectedCamp, selectedCamp]) => lastSelectedCamp !== selectedCamp)
.subscribe(([lastSelectedCamp, selectedCamp]) => {
  // unsubscribe old camp users
  if (lastSelectedCamp) {
    FirebaseDb.ref('/volunteers/' + lastSelectedCamp).off('value')
    FirebaseDb.ref('/refugees/' + lastSelectedCamp).off('value')
    Handlers.usersChanged()
  }
  // subscribe old camp users
  if (selectedCamp) {
    FirebaseDb.ref('/volunteers/' + selectedCamp).on('value', snapshot => Handlers.usersChanged(snapshot.val() || {}))
    FirebaseDb.ref('/refugees/' + selectedCamp).on('value', snapshot => Handlers.usersChanged(snapshot.val() || {}))
  }
})

// here will unsubscribe to obsolete volunteer list
store$.map(state => state.camps.userList).bufferCount(2, 1)
  .filter(([lastUserList, userList]) => Object.keys(lastUserList).some(oldUid => !userList[oldUid]))
  .map(([lastUserList, userList]) => Object.keys(lastUserList).filter(oldUid => !userList[oldUid]))
  .subscribe(oldUids => {
    oldUids.forEach(oldUid => {
      FirebaseDb.ref('/users/' + oldUid).off('value')
      Handlers.userChange(oldUid)
    })
  })

// here will subscribe to actual volunteer list
store$.map(state => state.camps.userList).bufferCount(2, 1)
  .filter(([lastUserList, userList]) => Object.keys(userList).some(uid => !lastUserList[uid]))
  .map(([lastUserList, userList]) => Object.keys(userList).filter(uid => !lastUserList[uid]))
  .subscribe(uids => {
    uids.forEach(uid => FirebaseDb.ref('/users/' + uid).on('value', snapshot => Handlers.userChange(uid, snapshot.val())))
  })

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

// raise user admin
payloads$(Actions.MAKE_ADMIN)
  .subscribe(data =>
    FirebaseDb
      .ref('admins/' + data.uid).set(true)
      .then(() => FirebaseDb.ref('campAdmins/' + data.cid + '/' + data.uid).set(true))
      .then(() => FirebaseDb.ref('users/' + data.uid + '/admin').set(true))
      .then(() => Handlers.okUser('camps', 'User raised admin'))
      .catch(err => Handlers.errorUser('camps', 'User not raised admin', err))
  )

// user downgraded from admin
payloads$(Actions.REMOVE_ADMIN)
  .subscribe(data =>
    FirebaseDb
      .ref('admins/' + data.uid).remove()
      .then(() => FirebaseDb.ref('campAdmins/' + data.cid + '/' + data.uid).remove())
      .then(() => FirebaseDb.ref('users/' + data.uid + '/admin').set(false))
      .then(() => Handlers.okUser('camps', 'User raised admin'))
      .catch(err => Handlers.errorUser('camps', 'User not raised admin', err))
  )
