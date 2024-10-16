import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Course } from '../types';
import CourseItem from './CourseItem';

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <Box mt={6}>
      {courses.length === 0 ? (
        <Text>Nenhum curso disponível</Text>
      ) : (
        courses.map(course => <CourseItem key={course.id} course={course} />)
      )}
    </Box>
  );
};

export default CourseList;
