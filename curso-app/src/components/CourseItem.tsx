import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import { Course } from '../types';
import CourseActions from './CourseActions';

interface CourseItemProps {
  course: Course;
  onEditCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
}

const CourseItem: React.FC<CourseItemProps> = ({ course, onEditCourse, onDeleteCourse }) => {
  const getYouTubeEmbedUrl = (url?: string): string => {
    if (!url) return '';
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
  };

  const videoEmbedUrl = getYouTubeEmbedUrl(course.videoUrl);

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
      <Heading size="md">{course.title}</Heading>
      <Text mt={2}>{course.description}</Text>
      {videoEmbedUrl && (
        <Box mt={2}>
          <iframe
            width="100%"
            height="315"
            src={videoEmbedUrl}
            title={course.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      )}
      <CourseActions 
        courseId={course.id} 
        onEdit={() => onEditCourse(course)} 
        onDelete={onDeleteCourse} 
      />
    </Box>
  );
};

export default CourseItem;
