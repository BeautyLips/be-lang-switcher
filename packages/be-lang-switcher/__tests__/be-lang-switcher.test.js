"use strict"

import { LangSwitcher } from "@beautylips/be-lang-switcher"
import { describe, expect, jest, test } from "@jest/globals"

describe("be-lang-switcher", () => {
  test("should be toggle lang", () => {
    // Arrange
    const updateFn = jest.fn()
    const switchLangFn = jest.fn()

    const langSwitcher = LangSwitcher({
      langOptions: [
        { value: "en", label: "EN" },
        { value: "fr", label: "FR" },
      ],
      plugin: { plugin: "pluginI18N" },
      langFallback: "en",
      langInit: "en",
      langReadStrategy: { cookies: false, storage: true, navigator: true },
      langKeyStorage: "lang",
      contextUser: {
        hi: "langSwitcher",
      },
      onUpdate(switcher) {
        // binding your framework
        updateFn(switcher.value)
      },
      onSwitchLang: async (switcher) => {
        // run action for your plugin
        switchLangFn(switcher.value)
      },
    })

    const sut = langSwitcher
    const expectedLang = "fr"

    // Act
    sut.switch(expectedLang)

    // Assert
    expect(sut.value).toEqual(expectedLang)
    expect(switchLangFn.call.length).toEqual(1)
    expect(updateFn.call.length).toEqual(1)
  })

  test("should be toggle url", () => {
    // Arrange
    const switchUrlGuard = jest.fn((value) => {
      sut.switch(value)
    })

    const langSwitcher = LangSwitcher({
      langOptions: [
        { value: "en", label: "EN" },
        { value: "fr", label: "FR" },
      ],
      plugin: { plugin: "pluginI18N" },
      langFallback: "en",
      langInit: "en",
      langReadStrategy: { cookies: false, storage: true, navigator: true },
      langKeyStorage: "lang",
      contextUser: {
        hi: "langSwitcher",
      },
      handleSwitchUrl(switcher, value) {
        // run action for toggle url /en /fr with your framework
        switchUrlGuard(value)
      },
    })

    const sut = langSwitcher
    const expectedLang = "fr"

    // Act
    sut.switchUrl("fr")

    // Assert
    expect(sut.value).toEqual(expectedLang)
    expect(switchUrlGuard.call.length).toEqual(1)
  })

  test("should be equal value and lang obj", () => {
    // Arrange
    const langSwitcher = LangSwitcher({
      langOptions: [
        { value: "en", label: "EN" },
        { value: "fr", label: "FR" },
      ],
      plugin: { plugin: "pluginI18N" },
      langFallback: "en",
      langInit: "en",
      langReadStrategy: { cookies: false, storage: true, navigator: true },
      langKeyStorage: "lang",
      contextUser: {
        hi: "langSwitcher",
      },
    })

    const sut = langSwitcher
    const expectedLang = "fr"
    const expectedLangObj = { value: "fr", label: "FR" }

    // Act
    sut.switch("fr")

    // Assert
    expect(sut.value).toEqual(expectedLang)
    expect(sut.lang.value).toEqual(expectedLangObj.value)
  })

  test("should be return falsy check support", () => {
    // Arrange
    const langSwitcher = LangSwitcher({
      langOptions: [
        { value: "en", label: "EN" },
        { value: "fr", label: "FR" },
      ],
      plugin: { plugin: "pluginI18N" },
      langFallback: "en",
      langInit: "en",
      langReadStrategy: { cookies: false, storage: true, navigator: true },
      langKeyStorage: "lang",
      contextUser: {
        hi: "langSwitcher",
      },
    })

    const sut = langSwitcher
    const langCheck = "de"
    const langFallback = "en"

    // Act
    const resultCheck = sut.support(langCheck)
    sut.switch(langCheck)

    // Assert
    expect(resultCheck).toBeFalsy()
    expect(sut.value).toEqual(langFallback)
  })

  test("should be return truthy check support", () => {
    // Arrange
    const langSwitcher = LangSwitcher({
      langOptions: [
        { value: "en", label: "EN" },
        { value: "fr", label: "FR" },
      ],
      plugin: { plugin: "pluginI18N" },
      langFallback: "en",
      langInit: "en",
      langReadStrategy: { cookies: false, storage: true, navigator: true },
      langKeyStorage: "lang",
      contextUser: {
        hi: "langSwitcher",
      },
    })

    const sut = langSwitcher
    const langCheck = "fr"

    // Act
    const resultCheck = sut.support(langCheck)
    sut.switch(langCheck)

    // Assert
    expect(resultCheck).toBeTruthy()
    expect(sut.value).toEqual(langCheck)
  })

  test("should be subscribe", () => {
    // Arrange
    const langSwitcher = LangSwitcher({
      langOptions: [
        { value: "en", label: "EN" },
        { value: "fr", label: "FR" },
      ],
      plugin: { plugin: "pluginI18N" },
      langFallback: "en",
      langInit: "en",
      langReadStrategy: { cookies: false, storage: true, navigator: true },
      langKeyStorage: "lang",
      contextUser: {
        hi: "langSwitcher",
      },
    })

    const sut = langSwitcher
    const onUpdateFn = jest.fn()
    const onSwitchFn = jest.fn()
    const onErrorFn = jest.fn()

    // Act
    sut.onUpdate(() => {
      onUpdateFn()
    })
    sut.onSwitchLang(() => {
      onSwitchFn()
    })
    sut.onError(() => {
      onErrorFn()
    })

    // Assert
    expect(onUpdateFn.call.length).toEqual(1)
    expect(onSwitchFn.call.length).toEqual(1)
    expect(onErrorFn.call.length).toEqual(1)
  })

  test("should be init", () => {
    // Arrange
    const langSwitcher = LangSwitcher({
      langOptions: [
        { value: "en", label: "EN" },
        { value: "fr", label: "FR" },
      ],
      plugin: { plugin: "pluginI18N" },
      langFallback: "en",
      langInit: "en",
      langReadStrategy: { cookies: false, storage: true, navigator: true },
      langKeyStorage: "lang",
      contextUser: {
        hi: "langSwitcher",
      },
    })

    const sut = langSwitcher
    const expectedValue = "en"

    // Act
    sut.init()

    // Assert
    expect(sut.value).toEqual(expectedValue)
  })
})
