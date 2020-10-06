import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080',
})

export const insertRecord = payload => api.post(`/AddRecord`, payload)
export const getAllRecords = () => api.get(`/ReadAll`)
export const updateRecordById = (id, payload) => api.put(`/UpdateRecord/${id}`, payload)
export const deleteRecordById = id => api.delete(`/DeleteRecord/${id}`)  //to make sure about the syntax of id

const apis = {
    insertRecord,
    getAllRecords,
    updateRecordById,
    deleteRecordById,
}

export default apis