const base_url = "https://payments-19w4misf5-malli7s-projects.vercel.app/";
export const signUp = async (userDetails) => {
  try {
    const response = await fetch(`${base_url}/user/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const signIn = async (userDetails) => {
  try {
    const response = await fetch(`${base_url}/user/signin`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const sendMoney = async (token, amount, to) => {
  const response = await fetch(`${base_url}/bank/transfer`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({ amount, to }),
  });
  const data = await response.json();
  if (data.error) {
    alert(data.error);
  }
};

export const getUserDetails = async (token) => {
    const response = await fetch(`${base_url}/user/getuser`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": token
        }
    })
    const data = await response.json()
    return data.user
}

export const getAllUsers = async (token) => {
    const response = await fetch(`${base_url}/user/getallusers`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": token
        }
    })
    const data = await response.json()
    return data.users
}

export const getUserBalances = async (token) => {
    const response = await fetch(`${base_url}/bank/balance`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": token
        }
    })
    const data = await response.json()
    return data.balance
}