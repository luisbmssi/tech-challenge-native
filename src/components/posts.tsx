import { FlatList } from "react-native";
import Post from "./post";

export type PostsProps = {
  _id: string
  title: string
  description: string
  author: string
  created_at: string
  modified_at: string
}

type Props = {
  data: PostsProps[]
}
export default function Posts({ data }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) =>
        <Post
          id={item._id}
          title={item.title}
          description={item.description}
          author={item.author}
          createdAt={item.created_at}
        />
      }
    />
  )
}