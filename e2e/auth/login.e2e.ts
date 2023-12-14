import { expect, test } from '@playwright/test'
import { PlayWrightUtils } from '../playwright-utils'

const DOMAIN = 'https://vue3-nh-login.vercel.app'
const CREDENTIALS = {
	username: 'qatester@gmail.com',
	password: '123456',
}
const WRONG_CREDENTIALS = {
	alreadyExistingUsername: 'joaoandretgoncalves@gmail.com',
	wrongPassword: '1234567',
	invalidUsername: 'qatester',
	invalidPassword: '123',
}

let utils: PlayWrightUtils
test.beforeEach(({ page }) => {
	utils = new PlayWrightUtils(page)
})

test('Sign Up', async ({ page }) => {
	await page.goto(`${DOMAIN}/`)

	await page.getByRole('button', { name: 'Sign up' }).click()

	await utils.validateURL('/sign-up')

	// Fill form incorrectly
	await page.getByPlaceholder('user@example.com').click()
	await page.getByPlaceholder('user@example.com').fill(WRONG_CREDENTIALS.invalidUsername)
	await page.getByPlaceholder('user@example.com').press('Tab')
	await page.getByPlaceholder('••••••••').fill(WRONG_CREDENTIALS.invalidPassword)
	await page.getByRole('button', { name: 'Sign up' }).click()

	// Errors should display
	await expect(page.getByText('String must contain at least')).toBeVisible()
	await expect(page.getByText('This is not a valid email.')).toBeVisible()

	// Fill form incorrectly - user that is already registered
	await page.getByPlaceholder('user@example.com').fill(WRONG_CREDENTIALS.alreadyExistingUsername)
	await page.getByPlaceholder('••••••••').fill(CREDENTIALS.password)
	await page.getByRole('button', { name: 'Sign up' }).click()

	// Error should display
	await expect(page.getByText('User already registered')).toBeVisible()

	// Fill form correctly
	await page.getByPlaceholder('user@example.com').fill(CREDENTIALS.username)

	// Should redirect user to sign in page
	await utils.validateURL('/')
})

test('Sign in', async ({ page }) => {
	await page.goto(`${DOMAIN}/`)

	// Fill form incorrectly
	await page.getByPlaceholder('user@example.com').click()
	await page.getByPlaceholder('user@example.com').fill(WRONG_CREDENTIALS.invalidUsername)
	await page.getByPlaceholder('user@example.com').press('Tab')
	await page.getByPlaceholder('••••••••').fill(WRONG_CREDENTIALS.invalidPassword)
	await page.getByRole('button', { name: 'Sign in' }).click()

	// Errors should display
	await expect(page.getByText('String must contain at least')).toBeVisible()
	await expect(page.getByText('This is not a valid email.')).toBeVisible()

	// Fill form correctly
	await page.getByPlaceholder('user@example.com').click()
	await page.getByPlaceholder('user@example.com').fill(CREDENTIALS.username)
	await page.getByPlaceholder('user@example.com').press('Tab')
	await page.getByPlaceholder('••••••••').fill(CREDENTIALS.password)
	await page.getByRole('button', { name: 'Sign in' }).click()

	await utils.validateURL('/')
})

test('Sign out', async ({ page }) => {
	await page.goto(`${DOMAIN}/`)
	await page.goto(`${DOMAIN}/sign-in`)
	await page.getByPlaceholder('user@example.com').click()
	await page.getByPlaceholder('user@example.com').fill(CREDENTIALS.username)
	await page.getByPlaceholder('user@example.com').press('Tab')
	await page.getByPlaceholder('••••••••').fill(CREDENTIALS.password)
	await page.getByRole('button', { name: 'Sign in' }).click()

	await utils.validateURL('/')

	await page.getByRole('button', { name: 'Sign out' }).click()

	await utils.validateURL('/sign-in')
})

test('Forgot Password', async ({ page }) => {
	await page.route('*/**/auth/v1/recover**', async (route) => {
		route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ success: true }),
		})
	})

	await page.goto(`${DOMAIN}/`)

	// Go to Forgot Password page
	await page.getByRole('link', { name: 'Forgot password?' }).click()
	await utils.validateURL('/forgot-password')

	// Fill form incorrectly
	await page.getByPlaceholder('user@example.com').fill('joaoan')
	await page.getByRole('button', { name: 'Submit' }).click()

	// Errors should display
	await expect(page.getByText('This is not a valid email.')).toBeVisible()

	// Fill form correctly
	await page.getByPlaceholder('user@example.com').fill(CREDENTIALS.username)
	await page.getByRole('button', { name: 'Submit' }).click()

	// Wait for the 'dialog' event
	const dialog = await page.waitForEvent('dialog')
	await expect(dialog.message()).toBe(`Password reset link has been sent to your email. Please check your inbox. If you don't see it, please also check your spam folder.`)
	await dialog.accept()

	// Should remain in the same page
	await utils.validateURL('/forgot-password')
})

test('TODO: Create account settings page to delete user', async ({ page }) => {
	await page.goto(`${DOMAIN}/`)
})

test('Test Count clicks', async ({ page }) => {
	// Sign in
	await page.goto(`${DOMAIN}/`)
	await page.goto(`${DOMAIN}/sign-in`)
	await page.getByPlaceholder('user@example.com').click()
	await page.getByPlaceholder('user@example.com').fill(CREDENTIALS.username)
	await page.getByPlaceholder('user@example.com').press('Tab')
	await page.getByPlaceholder('••••••••').fill(CREDENTIALS.password)
	await page.getByRole('button', { name: 'Sign in' }).click()

	// Test counter click
	const button = await page.getByRole('button', { name: 'Count is: 0' })
	await button.click({
		clickCount: 6,
	})
	// Verify if the button has the expected text
	await expect(page.getByRole('button', { name: 'Count is: 6' })).toBeVisible()
})

test('Test navigation after signing in', async ({ page }) => {
	// Sign in
	await page.goto(`${DOMAIN}/`)
	await page.goto(`${DOMAIN}/sign-in`)
	await page.getByPlaceholder('user@example.com').click()
	await page.getByPlaceholder('user@example.com').fill(CREDENTIALS.username)
	await page.getByPlaceholder('user@example.com').press('Tab')
	await page.getByPlaceholder('••••••••').fill(CREDENTIALS.password)
	await page.getByRole('button', { name: 'Sign in' }).click()

	await utils.validateURL('/')

	await page.getByRole('link', { name: 'Some Page' }).click()

	await utils.validateURL('/some-page')

	await page.getByRole('link', { name: 'Home' }).click()

	await utils.validateURL('/')
})
