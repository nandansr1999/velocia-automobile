import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
})

export default api;

export async function fetchCars(date) {
  const url = date ? `cars/availability/?date=${date}` : 'cars/'
  const res = await api.get(url)
  return res.data
}

export async function createBooking(payload) {
  const res = await api.post('bookings/', payload)
  return res.data
}