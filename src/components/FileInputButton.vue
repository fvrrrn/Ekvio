<template>
  <button v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<style scoped>
/* TODO: add semantic colors */
button {
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: white;
  color: #384252;
  transition: all 0.3s ease-out;
  box-shadow: 0px 4px 8px 0px #00000005;
}

button:hover:not(:disabled) {
  border-color: #d0d5dc;
  background-color: #f3f4f6;
}

button:active:not(:disabled) {
  background-color: #e5e7eb;
  border-color: #d0d5dc;
}

button:disabled {
  border-color: #e5e7eb;
  color: #9ca3b0;
  cursor: not-allowed;
}
</style>
