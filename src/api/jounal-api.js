import axios from "axios";

const API_URL = "https://kitkat-journal.herokuapp.com";

export const register = async (email, password) => {
  let errors = {};
  let data = {};
  try {
    const response = await axios.post(`${API_URL}/users`, {
      user: {
        email,
        password,
      },
    });
    console.log(response);
    data = {
      user: response.data.data,
      token: response.headers.authorization,
    };
  } catch (e) {
    errors = e.response.data.errors;
    console.log(errors);
  }

  return [data, errors];
};

export const login = async (email, password) => {
  let data = {};
  let error = "";
  try {
    const response = await axios.post(`${API_URL}/users/sign_in`, {
      user: {
        email,
        password,
      },
    });
    console.log(response);
    data = {
      user: response.data.data,
      token: response.headers.authorization,
    };
  } catch (e) {
    error = e.response.data.error;
    // errors = error.response.data.errors.full_messages;
    console.log(error);
  }

  return { data, error };
};

///////////////////////////////////////////////////////////////////////

export const createCategory = async (token, category, user) => {
  let data = {};
  let errors = {};
  let status;
  try {
    const res = await axios.post(
      `${API_URL}/api/v1/categories`,
      {
        name: category.name,
        description: category.description,
        user_id: user.id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log(res);
    data = res.data;
  } catch (e) {
    console.log(e);
    status = e.response.status;
    errors = e.response.data;
  }
  return { data, errors, status };
};

/////////////////////////////////////////////////////////////////////

export const getCategories = async (token) => {
  let data = [];
  let status;
  try {
    const res = await axios.get(`${API_URL}/api/v1/categories`, {
      headers: {
        Authorization: token,
      },
    });
    data = res.data;

    console.log(res);
  } catch (e) {
    status = e.response.status;
  }

  return { data, status };
};

/////////////////////////////////////////////////////////////////////

export const getCategory = async (token, id) => {
  let data = {};
  let status;
  try {
    const res = await axios.get(`${API_URL}/api/v1/categories/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    data = res.data;

    console.log(res);
  } catch (error) {
    status = error.response.status;
    console.error(error.response);
  }

  return { data, status };
};

//////////////////////////////////////////////////////////////////

export const editCategory = async (token, category, id) => {
  let data = {};
  let errors = {};
  let status;
  try {
    const res = await axios.put(
      `${API_URL}/api/v1/categories/${id}`,
      {
        name: category.name,
        description: category.description,
      },
      { headers: { Authorization: token } }
    );
    data = res.data;
  } catch (e) {
    status = e.response.status;
    errors = e.response.data;
  }

  return { data, errors, status };
};

///////////////////////////////////////////////////////////
export const deleteCategory = async (token, id) => {
  let status;
  try {
    const res = await axios.delete(`${API_URL}/api/v1/categories/${id}`, {
      headers: { Authorization: token },
    });
    console.log(res);
    status = res.status;
  } catch (e) {
    console.log(e);
    status = e.response.status;
  }
  return status;
};

//////////////////////////////////////////////////
export const createTask = async (token, task, category_id) => {
  let data = {};
  let errors = {};
  let status;
  try {
    const res = await axios.post(
      `${API_URL}/api/v1/tasks`,
      {
        name: task.name,
        description: task.description,
        date: task.date,
        category_id: category_id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log(res);
    data = res.data;
  } catch (e) {
    console.log(e.response);
    status = e.response.status;
    errors = e.response.data;
  }

  return { data, errors, status };
};

/////////////////////////////////////////////////
export const getTask = async (token, id) => {
  let data = {};
  let status;
  try {
    const res = await axios.get(`${API_URL}/api/v1/tasks/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res);
    data = res.data;
  } catch (e) {
    console.log(e);
    status = e.response.status;
  }

  return { data, status };
};

//////////////////////////////////////////////////
export const editTask = async (token, task, id) => {
  let data = {};
  let errors = {};
  let status;
  try {
    const res = await axios.put(
      `${API_URL}/api/v1/tasks/${id}`,
      {
        name: task.name,
        description: task.description,
        date: task.date,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("editTask API", res);
    data = res.data;
  } catch (e) {
    console.log(e.response);
    status = e.response.status;
    errors = e.response.data;
  }
  return { data, status, errors };
};
////////////////////////////////////////////////

export const deleteTask = async (token, id) => {
  try {
    const res = await axios.delete(`${API_URL}/api/v1/tasks/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

/////////////////////////////////////////////

export const completeTask = async (token, id, completed) => {
  try {
    const res = await axios.put(
      `${API_URL}/api/v1/task/${id}`,
      {
        completed: !completed,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
////////////////////////////////////////////////
export const getAllTasks = async (token) => {
  let data = [];
  let status;
  try {
    const res = await axios.get(`${API_URL}/api/v1/tasks`, {
      headers: {
        Authorization: token,
      },
    });
    data = res.data;

    console.log(data);
  } catch (e) {
    status = e.response.status;
  }

  return { data, status };
};

/////////////////////////////////////////////////
export const toggleCompleteTask = async (token, id, completed) => {
  let data = {};
  let status;
  try {
    const res = await axios.put(
      `${API_URL}/api/v1/tasks/${id}`,
      {
        completed: !completed,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    data = res.data;
    console.log(res);
  } catch (e) {
    status = e.response.status;
    console.log(e.response);
  }

  return { data, status };
};
