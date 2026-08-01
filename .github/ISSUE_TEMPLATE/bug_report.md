name: 🐛 Bug Report
description: Create a bug report to help us resolve issues
title: '[BUG] '
labels: ['bug']
body:
  - type: textarea
    id: description
    attributes:
      label: Bug Description
      description: Clear and concise description of the bug.
    validations:
      required: true
  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: Step-by-step instructions to reproduce the behavior.
    validations:
      required: true
