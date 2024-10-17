import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, Textarea, FormControl, FormLabel } from '@chakra-ui/react';
import { Course } from '../types';

interface CourseFormProps {
  onAddCourse: (course: Course) => void;
  course?: Course; 
}

const CourseForm: React.FC<CourseFormProps> = ({ onAddCourse, course }) => {
  const { register, handleSubmit, reset, setValue } = useForm<Course>();

  useEffect(() => {
    if (course) {
      setValue('title', course.title);
      setValue('description', course.description);
      setValue('startDate', course.startDate);
      setValue('endDate', course.endDate);
      setValue('videoUrl', course.videoUrl);
    } else {
      reset(); 
    }
  }, [course, setValue, reset]);

  const onSubmit = (data: Course) => {
    const courseToSave = {
      ...course, 
      ...data,
    };
    onAddCourse(courseToSave);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} mt={6}>
      <FormControl mb={4}>
        <FormLabel>Título do Curso</FormLabel>
        <Input {...register('title', { required: true })} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Descrição</FormLabel>
        <Textarea {...register('description', { required: true })} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Data de Início</FormLabel>
        <Input type="date" {...register('startDate', { required: true })} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Data de Término</FormLabel>
        <Input type="date" {...register('endDate', { required: true })} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>URL do Vídeo</FormLabel>
        <Input {...register('videoUrl', { required: true })} />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        {course ? 'Atualizar Curso' : 'Adicionar Curso'}
      </Button>
    </Box>
  );
};

export default CourseForm;
