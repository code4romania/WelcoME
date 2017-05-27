import React from 'react'
import Button from 'react-md/lib/Buttons/Button'

const AccountHeader = ({
  facebook,
  google,
  password,
  asylum,
  admin,
  refugee,
  volunteer,
}) => {
  return (
    <div>
      {admin ? <Button flat label='Administrator' /> : null}
      {refugee ? <Button flat primary label='Refugee' /> : null}
      {asylum ? <Button flat primary label='Asylum seeker' /> : null}
      {volunteer ? <Button flat secondary label='Volunteer' /> : null}
      {facebook ? <Button flat primary iconClassName='fa fa-facebook' /> : null}
      {password ? <Button flat iconClassName='fa fa-envelope' /> : null}
      {google ? <Button flat secondary iconClassName='fa fa-google' /> : null}
    </div>
  )
}

export default AccountHeader
