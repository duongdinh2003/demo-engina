import axios from "axios";
import { BASE_URL } from "../../constants/api";

export const handleGoogleSignIn = async (token) => {
  try {
    const response = await axios.post(`${BASE_URL}/google/`, {
      token_google: token,
    });
    return response;
  } catch (error) {
    if (error.response) {
      console.log("Error Google sign in:", error.response);
      throw error.response;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const handleSignIn = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/`, {
      username,
      password,
    });
    return response;
  } catch (error) {
    if (error.response) {
      //   console.log("Error Sign in:", error.response);
      throw error.response;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const handleSignUp = async (username, password, email) => {
  try {
    const response = await axios.post(`${BASE_URL}/register/`, {
      username,
      password,
      email,
    });
    return response;
  } catch (error) {
    if (error.response) {
      // console.log("Error Sign up:", error.response);
      throw error.response;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const handleChangePassword = async (
  old_password,
  new_password,
  userToken
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/change_password/`,
      {
        old_password: old_password,
        new_password: new_password,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      // console.log("Error change password:", error.response);
      throw error.response;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

const FormData = global.FormData;

export const handleUploadAvatar = async (image, userToken) => {
  const formData = new FormData();

  formData.append("avatar", {
    uri: image,
    type: "image/png",
    name: "avatar-image.png",
  });

  try {
    const response = await axios.post(
      `${BASE_URL}/user_profile_avatar_upload/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.log("Error upload avatar:", error.response);
      throw error.response;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const handleUpdateProfile = async (
  full_name,
  english_level,
  daily_study_time,
  phone_number,
  gender,
  userToken
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/profile/`,
      {
        full_name: full_name,
        english_level: english_level,
        daily_study_time: daily_study_time,
        phone_number: phone_number,
        gender: gender,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.log("Error update profile:", error.response);
      throw error.response;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const handleGetUserProfile = async (userToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      console.log("Error get profile:", error.response);
      throw error.response;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const handleResetPassword = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/password_reset_request/`, {
      email: email,
    });
    return response;
  } catch (error) {
    if (error.response) {
      console.log("Error reset password:", error.response);
      throw error.response;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
