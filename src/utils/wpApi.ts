const getBaseUrl = (): string => {
  const regex = /^.*:(5173).*$/g;
  const base = window.location.host;
  const found = base.search(regex);
  return found === -1 ? '' : 'http://localhost:8889';
};

export const getPosts = async (postType: string) => {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(
      `${baseUrl}/index.php?rest_route=%2Fwp%2Fv2%2F${postType}&per_page=100&_locale=user`,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
