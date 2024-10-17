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
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
      <Heading size="md">{course.title}</Heading>
      <Text mt={2}>{course.description}</Text>
      <Text>{course.videoUrl}</Text>
      <CourseActions 
        courseId={course.id} 
        onEdit={() => onEditCourse(course)} 
        onDelete={onDeleteCourse} 
      />
    </Box>
  );
};

export default CourseItem;
