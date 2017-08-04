import React from 'react'
import {studies, skills} from '../../../utils'
import SkillsStep from '../SkillsStep'

const SkillsStepContext = () => {
  return (
    <SkillsStep {...{studies,skills}} />
  );
}

export default SkillsStepContext
