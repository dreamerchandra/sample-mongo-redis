import React from 'react'
import ssrPrepass from 'react-ssr-prepass'
import chalk from 'chalk'
import fs from 'fs'

function logDuplicateKeyMessage(key, component) {
  /* eslint-disable no-console */
  console.log('')
  console.log(
    chalk.red(
      `Warning: <${component} /> is overwriting an existing server data value for "${key}".`
    )
  )
  console.log(chalk.red('This can cause unexpected behavior.'))
  console.log('')
}

export const fetchDataForRender = (ServerApp, req) => {
  let data = {}

  return ssrPrepass(<ServerApp data={data} location={req.url} />, (element) => {
    if (element && element.type && element.type.fetchData) {
      return element.type.fetchData(req).then((d) => {
        Object.keys(d).forEach((key) => {
          if (data[key]) {
            logDuplicateKeyMessage(key, element.type.name)
          }
        })

        data = {
          ...data,
          ...d,
        }
      })
    }
    if (element && element.type && element.type.inject) {
      console.log('in here')
      element.type.inject.forEach((file) => {
        const content = fs.readFileSync(`${process.env.PUBLIC_URL}/${file}`)
        console.log(content, 'content')
        data = {
          ...data,
          [file]: content,
        }
      })
      return Promise.resolve(data)
    }
  })
    .then(() => {
      return data
    })
    .catch(() => {
      return data
    })
}
