import Api from "@/services/Api";

export default {
  fetchPosts() {
    return Api().get("posts");
  },
  addPost(params) {
    return Api().post("posts", params);
  },
  updatePost(params) {
    return Api().put("posts/" + params.id, params);
  },

  getPost(params) {
    return Api().get("posts/" + params.id);
  },
  deletePost(id) {
    return Api().delete("posts/" + id);
  },
  login(data) {
    return Api().post("users/login", data);
  },
  logout() {
    return Api().get("users/logout");
  },
  getUserProfile() {
    return Api().get("users/getUserProfile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });
  },
  setUserProfile(data) {
    return Api().post("users/userProfile",data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    });
  }
};
