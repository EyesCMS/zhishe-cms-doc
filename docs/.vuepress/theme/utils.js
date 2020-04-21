import axios from 'axios'
import dynamicLoadScript from './dynamic-load-script'

export function isGitee() {
  const origin = window.location.origin
  if (origin.includes('gitee.io')) {
    return true
  }
  return false
}
