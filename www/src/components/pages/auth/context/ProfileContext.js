import React from 'react'
import PropTypes from 'prop-types'
import { onlyNonEmptyKeys, countries, studies, skills } from '../../../utils'
import Profile from '../Profile'
const ProfileContext = (p, context) => {
    const state = context.store;
    const auth = state.auth;
    const forms = state.forms.account;
    const handlers = context.handlers;

    // TODO: #3 replace these checks with some auth state evaluation
    const accountStep1OK =
        auth.type && auth.emailVerified && auth.firstName && auth.lastName;

    const editing = !accountStep1OK || (forms.accountEditStep === 1);

    const maySave =
        (forms.firstName || auth.firstName) &&
        (forms.lastName || auth.lastName) &&
        (forms.type || auth.type) &&
        auth.emailVerified;

    const getCampsNames = function() {
        const campsNames = []
        Object.keys(state.camps.camps).forEach(function(campId) {
            campsNames.push(state.camps.camps[campId].name)
        })
        return campsNames
    }
    const campsNames = getCampsNames();

    const panel = {
        cancelLabel: editing ? (accountStep1OK ? 'Cancel' : '') : 'Close',
        saveLabel: editing ? (maySave ? 'Save' : 'Compile all fields') : 'Edit',
        saveSecondary: !maySave,
        expanded: !accountStep1OK || (forms.accountStep === 1),
        onSave: () => {
            if (!maySave) {
                return
            }
            if (editing) {
                handlers.writeToProfile(onlyNonEmptyKeys(forms, auth))
                handlers.clearFields('account', { accountStep: 1 })
            } else {
                handlers.changeFields('account', { accountEditStep: 1 })
            }
        },
        onCancel: () => editing ? handlers.changeFields('account', { accountEditStep: 0 }) : handlers.changeFields('account', { accountStep: 0 }),
        onExpandToggle: () =>
            accountStep1OK &&
            handlers.changeFields(
                'account', { accountStep: forms.accountStep === 1 ? 0 : 1 }
            ),
        camps: campsNames,
        countries: countries,
        studies : studies,
        skills: skills
    };

    // TODO: #1 structure these fields
    const profile = {
        onChangeKey: (key, value) =>
            editing && handlers.changeFields('account', {
                [key]: value }),
        sendVerifyEmail: () =>
            !auth.emailVerified &&
            handlers.writeToProfile({ sendVerificationEmail: true }),
        linkFacebook: handlers.linkFacebook,
        linkGoogle: handlers.linkGoogle,
        editing,
        accountStep1OK,
        loaded: auth.loaded,
        emailVerified: auth.emailVerified,
        email: forms.email || auth.email,
        firstName: forms.firstName || auth.firstName,
        lastName: forms.lastName || auth.lastName,
        location: forms.location,
        refugee: (forms.type || auth.type) === 'refugee',
        volunteer: (forms.type || auth.type) === 'volunteer',
        admin: (forms.type || auth.type) === 'admin',
        asylum: (forms.type || auth.type) === 'asylum',
        facebook: !!(auth.facebook && auth.facebookCredential),
        google: !!(auth.google && auth.googleCredential),
        password: auth.password
    };

    return ( < Profile {... { panel, profile } }
        />
    );
}

ProfileContext.contextTypes = {
    store: PropTypes.object.isRequired,
    handlers: PropTypes.object.isRequired
}

export default ProfileContext
