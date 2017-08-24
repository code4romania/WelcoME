import React from 'react'
import Radio from 'react-md/lib/SelectionControls/Radio'
import Button from 'react-md/lib/Buttons/Button'
import TextField from 'react-md/lib/TextFields'
import Grid from 'material-ui/Grid';

// TODO: #1 stucture these fields
const Account = ({
  facebook,
  google,
  password,
  asylum,
  admin,
  refugee,
  volunteer,
  editing,
  email,
  firstName,
  lastName,
  loaded,
  linkFacebook,
  linkGoogle,
  onChangeKey,
  sendVerifyEmail,
  emailVerified,
}) => {
  // TODO: #3 make components for rendering section
  return (
    <Grid container spacing={24} align={'center'} justify={'center'}>
      <Grid xs={4}>
        <fieldset>
          <legend className='md-subheading-1'>
            Account
          </legend>
          <TextField
            id='email'
            fullWidth
            readOnly
            value={email}
            type='email'
            label='Email' />
          <TextField
            id='firstName'
            fullWidth
            readOnly={!editing}
            required
            onChange={val => onChangeKey('firstName', val)}
            value={firstName}
            label='First Name' />
          <TextField
            id='lastName'
            fullWidth
            readOnly={!editing}
            required
            onChange={val => onChangeKey('lastName', val)}
            value={lastName}
            label='Last Name' />
        </fieldset>
      </Grid>
      <Grid xs={4}>
        <fieldset>
          <legend className='md-subheading-1'>
            Account Type
          </legend>
          <Radio
            id='refugee'
            name='accType'
            value='refugee'
            label='Refugee'
            checked={refugee}
            onChange={(type) => onChangeKey('type', type)} />
          <Radio
            id='asylum'
            name='accType'
            value='asylum'
            label='Asylum seeker'
            checked={asylum}
            onChange={(type) => onChangeKey('type', type)} />
          <Radio
            id='volunteer'
            name='accType'
            value='volunteer'
            label='Volunteer'
            checked={volunteer}
            onChange={(type) => onChangeKey('type', type)} />
          <Radio
            id='admin'
            name='accType'
            value='admin'
            label='Administrator'
            checked={admin}
            onChange={(type) => onChangeKey('type', type)} />
        </fieldset>
      </Grid>
      <Grid xs={4}>
        <fieldset>
          <legend className='md-subheading-1'>
            Providers
          </legend>
          <Grid container spacing={24} align={'center'} justify={'center'}>
            <Grid center='xs' style={{marginBottom: 32}}>
            {
              emailVerified
                ? <Button flat iconBefore={false} label={password ? 'linked' : 'verified'} iconClassName='fa fa-envelope' />
                : <Button disabled={!loaded} onClick={sendVerifyEmail} raised iconBefore={false} label='Resend email verify link' iconClassName='fa fa-envelope' />
            }
            </Grid>
            <Grid center='xs' style={{marginBottom: 32}}>
            {
              facebook
                ? <Button flat primary iconBefore={false} label='linked' iconClassName='fa fa-facebook' />
                : <Button disabled={!loaded} onClick={linkFacebook} raised primary iconBefore={false} label='Link Facebook account' iconClassName='fa fa-facebook' />
            }
            </Grid>
            <Grid center='xs' style={{marginBottom: 32}}>
            {
              google
                ? <Button flat secondary iconBefore={false} label='linked' iconClassName='fa fa-google' />
                : <Button disabled={!loaded} onClick={linkGoogle} raised secondary iconBefore={false} label='Link Google account' iconClassName='fa fa-google' />
            }
            </Grid>
          </Grid>
        </fieldset>
      </Grid>
    </Grid>
  );
}

export default Account
