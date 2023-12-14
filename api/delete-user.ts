/* eslint-disable node/prefer-global/process */
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Set up Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function (request: VercelRequest, response: VercelResponse) {
	try {
		// Extract user ID from request body or parameters
		const { userId } = request.body

		// Ensure userId is provided
		if (!userId) {
			response.status(400).json({ error: 'User ID is required.' })
			return
		}

		// Check if the user exists before attempting to delete
		const { data: existingUser } = await supabase
			.from('users')
			.select('id')
			.eq('id', userId)
			.single()

		if (!existingUser) {
			response.status(404).json({ error: 'User not found.' })
			return
		}

		// Perform the deletion
		const { error } = await supabase
			.from('users')
			.delete()
			.eq('id', userId)

		if (error) {
			throw error
		}

		response.status(200).json({ message: 'Account deleted successfully.' })
	} catch (error) {
		console.error('Error deleting account:', error)
		response.status(500).json({ error: 'Internal Server Error' })
	}
}
