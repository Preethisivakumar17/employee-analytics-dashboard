import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

export const getDashboard = () => {
    return axios.get(`${BASE_URL}/dashboard`);
};

export const getEmployees = () => {
    return axios.get(`${BASE_URL}/employees`);
};
export const addEmployee = (employeeData) => {
    return axios.post(
        `${BASE_URL}/employees`,
        employeeData
    );
};
export const updateEmployee = (id, employeeData) => {
    return axios.put(
        `${BASE_URL}/employees/${id}`,
        employeeData
    );
};
export const deleteEmployee = (id) => {
    return axios.delete(
        `${BASE_URL}/employees/${id}`
    );
};