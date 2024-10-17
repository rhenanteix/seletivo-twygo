import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Heading, Button, theme, extendTheme} from '@chakra-ui/react';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import { Course } from './types';
import { getCourses } from './services/courseService';

const customTheme = extendTheme({
});

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      const fetchedCourses = await getCourses();
      setCourses(fetchedCourses);
    }
    fetchCourses();
  }, []);

  const handleAddCourse = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading mb={6}>Cursos Disponíveis</Heading>
        {showForm ? (
          <CourseForm onAddCourse={handleAddCourse} />
        ) : (
          <Button onClick={() => setShowForm(true)}>Adicionar Curso</Button>
        )}
        <CourseList courses={courses} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
