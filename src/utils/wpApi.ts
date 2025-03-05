export const getPosts = async (postType: string) => {
  try {
    const res = await fetch(
      `
      http://localhost:8889/index.php?rest_route=%2Fwp%2Fv2%2F${postType}&per_page=100&_locale=user`,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
