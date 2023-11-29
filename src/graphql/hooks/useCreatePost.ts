import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../mutations/CreatePost';

type CreatePostVariables = {
  user: string;
  description: string;
  priceNow: number;
  mileage: number;
  year: number;
  vehicle: string;
  images: string[];
  brand: string;
  priceBefore?: number;
  views?: number;
};

const useCreatePost = () => {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  const handleCreatePost = async (variables: CreatePostVariables) => {
    try {
      console.log(JSON.stringify(variables));
      const { data } = await createPost({ variables });
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return { handleCreatePost, data, loading, error };
};

export default useCreatePost;
