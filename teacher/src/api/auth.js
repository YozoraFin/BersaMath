import api from "./Api"

export const authService = {
    login: async (identifier, password) => {
        try {
            const response = await api.post('api/v1/auth/teacher/login', {
                identifier,
                password
            })
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}