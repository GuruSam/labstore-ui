import TokenService from './token'
import AuthService from './auth'
import ApiService from './api'
import UserService from './user'
import ContentService from './content'

export const tokenService = new TokenService()
export const apiService = new ApiService()
export const authService = new AuthService()
export const userService = new UserService()
export const contentService = new ContentService()
