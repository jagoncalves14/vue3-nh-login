import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Set up Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const serviceRoleKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || ''
const supabase = createClient(supabaseUrl, serviceRoleKey, {
	auth: {
		autoRefreshToken: false,
		persistSession: false,
	},
})

export default async function (request: VercelRequest, response: VercelResponse) {
	try {
		// Extract user ID from request body or parameters
		const { userId } = request.body

		// Ensure userId is provided
		if (!userId) {
			response.status(400).json({ error: 'User ID is required.' })
			return
		}

		// Perform the deletion
		const { error } = await supabase.auth.admin.deleteUser(userId)
		if (error) {
			throw error
		}

		response.status(200).json({ message: 'Account deleted successfully.' })
	} catch (error) {
		console.error('Error deleting account:', error)
		response.status(500).json({ error: 'Internal Server Error' })
	}
}
