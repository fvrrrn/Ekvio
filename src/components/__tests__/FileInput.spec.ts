import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FileInput from '../FileInput.vue'

describe('FileInput', () => {
  it('renders properly', () => {
    const wrapper = mount(FileInput, { props: { label: 'Label' } })
    expect(wrapper.text()).toContain('Label')
  })
})
