import axios from 'axios'

export const signin = async (formData, navigate, setError) => {
    try {
        const { data } = await axios.post('https://wordorizor-api.vercel.app/user/signin', formData)
        localStorage.setItem('profile', JSON.stringify({ ...data }))
        navigate('/')
    } catch (error) {
        console.log(error)
        setError(error.response.data.message)
    }
}

export const signup = async (formData, navigate, setError) => {
    try {
        const { data } = await axios.post('https://wordorizor-api.vercel.app/user/signup', formData)
        localStorage.setItem('profile', JSON.stringify({ ...data }))
        navigate('/')
    } catch (error) {
        console.log(error)
        setError(error.response.data.message)
    }
}
