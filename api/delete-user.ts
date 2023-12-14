/* eslint-disable node/prefer-global/process */
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Set up Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseKey = process.env.VITE_SUPABASE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default async (req: VercelRequest, res: VercelResponse): Promise<void> => {
	try {
		// Extract user ID from request body or parameters
		const { userId } = req.body

		// Ensure userId is provided
		if (!userId) {
			res.status(400).json({ error: 'User ID is required.' })
			return
		}

		// Check if the user exists before attempting to delete
		const { data: existingUser } = await supabase
			.from('users')
			.select('id')
			.eq('id', userId)
			.single()

		if (!existingUser) {
			res.status(404).json({ error: 'User not found.' })
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

		res.status(200).json({ message: 'Account deleted successfully.' })
	} catch (error) {
		console.error('Error deleting account:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
