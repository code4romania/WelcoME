import React from 'react'
import { studies, skills } from '../../../utils'
import PropTypes from 'prop-types'
import SkillsStep from '../SkillsStep'

const SkillsStepContext = () => {
  	 return ( < SkillsStep  {...{studies,skills}}
        />)
}
export default SkillsStepContext
