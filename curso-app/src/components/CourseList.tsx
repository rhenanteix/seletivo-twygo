import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Course } from '../types';
import CourseItem from './CourseItem';
import CourseForm from './CourseForm';

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  const [courseList, setCourseList] = useState<Course[]>(courses);
  const [editingCourse, setEditingCourse] = useState<Course | undefined>(undefined);

  const handleAddOrEditCourse = (newCourse: Course) => {
    if (newCourse.id) {
      setCourseList(prevCourses =>
        prevCourses.map(course =>
          course.id === newCourse.id ? newCourse : course
        )
      );
    } else {
      const newId = Date.now().toString(); 
      setCourseList(prevCourses => [
        ...prevCourses,
        { ...newCourse, id: newId },
      ]);
    }
    setEditingCourse(undefined);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourseList(prevCourses =>
      prevCourses.filter(course => course.id !== courseId)
    );
  };

  const filterActiveCourses = (course: Course) => {
    const today = new Date();
    const endDate = new Date(course.endDate || '');
    return endDate >= today;
  };

  return (
    <Box mt={6}>
      {courseList.length === 0 ? (
        <Text>Nenhum curso disponível</Text>
      ) : (
        courseList
          .filter(filterActiveCourses)
          .map(course => (
            <CourseItem
              key={course.id}
              course={course}
              onEditCourse={setEditingCourse}
              onDeleteCourse={handleDeleteCourse}
            />
          ))
      )}

      <CourseForm
        onAddCourse={handleAddOrEditCourse}
        course={editingCourse} 
      />
    </Box>
  );
};

export default CourseList;
