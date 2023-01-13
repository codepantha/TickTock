import { NextPage } from 'next';
import React from 'react'

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  return (
    <div>VideoCard</div>
  )
}

export default VideoCard