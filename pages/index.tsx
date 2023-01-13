import axios from 'axios';
import NoResults from '../components/NoResults';
import VideoCard from '../components/VideoCard';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  console.log(videos);
  return <div className="flex flex-col gap-10 videos h-full">
    {videos.length ? (
      videos.map((video: Video) => (
        <VideoCard post={video} key={video._id} />
      ))
    ) : (
      <NoResults text='no videos' />
    )}
  </div>;
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/posts`);

  return {
    props: {
      videos: data
    }
  };
};

export default Home;
