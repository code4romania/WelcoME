## Rxdux

       +-------------- Services <--------------+          
       |                                       |
       v                                       |
    Actions-----------> Dispatcher --------> Stores ------------> Views
       ^                                                            |
       |                                                            |  
       +----------------------- User <------------------------------+

  using RxJs: https://github.com/ReactiveX/rxjs

## Authentication and Authorization

   We have camps. A camp has an Id: cid. 
   We have users. User has an Id: uid. User roles are refugees or volunteers.
   Special users exists with the role owner. These users may not be cancelled.
   The owner role is to be assigned/removed only from the firebase console.     
   
   Users signs up with email/password, google and facebook as refugee or volunteer choosing ONE camp initialy.
   At a later time the user may link any of the three methods of authentication to the existing account. 
   An user will be linked with ONLY one camp at any time. An user may cancel account or change camp in any moment.
   As refugee, an user can't have admin privileges, only volunteers have. 
   Volunteers may be raised admin for the current camp
   Owner role may upgrade/downgrade admin roles and add/remove camps.

  
   