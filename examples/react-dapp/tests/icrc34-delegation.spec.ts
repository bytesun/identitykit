import { expect } from "@playwright/test"
import { test as base } from "@playwright/test"
import { DemoPage } from "./page/demo.page"
import { Icrc25RequestPermissionsSection } from "./section/icrc25-request-permissions.section"
import { Icrc34DelegationSection } from "./section/icrc34-delegation.section"

type Fixtures = {
  section: Icrc34DelegationSection
  demoPage: DemoPage
  requestPermissionSection: Icrc25RequestPermissionsSection
}

const test = base.extend<Fixtures>({
  section: async ({ page }, use) => {
    const section = new Icrc34DelegationSection(page)
    await use(section)
  },
  demoPage: [
    async ({ page }, use) => {
      const demoPage = new DemoPage(page)
      await demoPage.goto()
      await demoPage.login()
      await use(demoPage)
    },
    { auto: true },
  ],
  requestPermissionSection: [
    async ({ page }, use) => {
      const requestPermissionSection = new Icrc25RequestPermissionsSection(page)
      await requestPermissionSection.approvePermissions()
      await use(requestPermissionSection)
    },
    { auto: true },
  ],
})

test("should check request and response has correct initial state", async ({ section }) => {
  const request = {
    method: "icrc34_delegation",
    params: {
      publicKey: "MCowBQYDK2VwAyEAbK2m/DMYZ4FOpBH5IQnH0WX+L1+it1Yko204OSSQrVA=",
      targets: ["do25a-dyaaa-aaaak-qifua-cai"],
      maxTimeToLive: "28800000000000",
    },
  }

  const initialRequest = await section.getRequestJson()
  expect(initialRequest).toStrictEqual(request)

  const initialResponse = await section.getResponseJson()
  expect(initialResponse).toStrictEqual({})
})

test("should request global delegation with targets", async ({ section }) => {
  const popup = await section.openPopup()

  const isDisabledGlobalAccount = await section.isDisabledGlobalAccount(popup)
  expect(isDisabledGlobalAccount).toBeFalsy()

  const isDisabledSessionAccount = await section.isDisabledSessionAccount(popup)
  expect(isDisabledSessionAccount).toBeFalsy()

  await section.selectGlobalAccount(popup)

  await section.waitForResponse()

  const actualResponse = await section.getResponseJson()

  expect(actualResponse).toMatchObject({
    signerDelegation: [
      {
        delegation: {
          expiration: expect.anything(),
          pubkey: "MCowBQYDK2VwAyEAbK2m/DMYZ4FOpBH5IQnH0WX+L1+it1Yko204OSSQrVA=",
          targets: ["do25a-dyaaa-aaaak-qifua-cai"],
        },
        signature: expect.anything(),
      },
    ],
    publicKey: "MCowBQYDK2VwAyEAO2onvM62pC1io6jQKm8Nc2UyFXcd4kOmOsBIoYtZ2ik=",
  })
})

test("should request session delegation with no targets", async ({ section }) => {
  await section.setRequestWithNoTargets()

  const popup = await section.openPopup()

  const isDisabledGlobalAccount = await section.isDisabledGlobalAccount(popup)
  expect(isDisabledGlobalAccount).toBeTruthy()

  const isDisabledSessionAccount = await section.isDisabledSessionAccount(popup)
  expect(isDisabledSessionAccount).toBeFalsy()

  await section.selectSessionAccount(popup)

  await section.waitForResponse()

  const actualResponse = await section.getResponseJson()

  expect(actualResponse).toMatchObject({
    signerDelegation: [
      {
        delegation: {
          expiration: expect.anything(),
          pubkey: "MCowBQYDK2VwAyEAbK2m/DMYZ4FOpBH5IQnH0WX+L1+it1Yko204OSSQrVA=",
        },
        signature: expect.anything(),
      },
    ],
    publicKey: "MCowBQYDK2VwAyEAMAityFffzQR3p6qgGmV8ppI852wHZFcEsehy3rElO6o=",
  })
})