import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Course } from '../types';

interface CourseFormProps {
  onAddCourse: (course: Course) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ onAddCourse }) => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<Course>();

  const watchStartDate = watch('startDate');
  const watchEndDate = watch('endDate');
  
  // Verifica se existe valor válido para a data antes de criar um objeto Date
  const startDate = watchStartDate ? new Date(watchStartDate) : null;
  const endDate = watchEndDate ? new Date(watchEndDate) : null;

  const formatDateToString = (date: Date | null) => date ? date.toISOString().split('T')[0] : undefined;

  const onSubmit = (data: Course) => {
    const newCourse = {
      ...data,
      id: Math.random().toString(36).substr(2, 9), // Gera um ID aleatório
    };
    onAddCourse(newCourse);
    reset();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} mt={6}>
      {/* Título do Curso */}
      <FormControl mb={4} isInvalid={!!errors.title}>
        <FormLabel>Título do Curso</FormLabel>
        <Input
          {...register('title', { required: 'O título é obrigatório' })}
          placeholder="Digite o título do curso"
        />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
      </FormControl>

      {/* Descrição */}
      <FormControl mb={4} isInvalid={!!errors.description}>
        <FormLabel>Descrição</FormLabel>
        <Textarea
          {...register('description', { required: 'A descrição é obrigatória' })}
          placeholder="Digite a descrição do curso"
        />
        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
      </FormControl>

      {/* Data de Início */}
      <FormControl mb={4} isInvalid={!!errors.startDate}>
        <FormLabel>Data de Início</FormLabel>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setValue('startDate', formatDateToString(date))}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecione a data de início"
        />
        <FormErrorMessage>{errors.startDate && 'A data de início é obrigatória'}</FormErrorMessage>
      </FormControl>

      {/* Data de Término */}
      <FormControl mb={4} isInvalid={!!errors.endDate}>
        <FormLabel>Data de Término</FormLabel>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setValue('endDate', formatDateToString(date))}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecione a data de término"
        />
        <FormErrorMessage>{errors.endDate && 'A data de término é obrigatória'}</FormErrorMessage>
      </FormControl>

      {/* URL do Vídeo */}
      <FormControl mb={4} isInvalid={!!errors.videoUrl}>
        <FormLabel>URL do Vídeo</FormLabel>
        <Input
          {...register('videoUrl', {
            required: 'A URL do vídeo é obrigatória',
            pattern: {
              value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
              message: 'Insira uma URL válida do YouTube',
            },
          })}
          placeholder="Digite a URL do vídeo"
        />
        <FormErrorMessage>{errors.videoUrl?.message}</FormErrorMessage>
      </FormControl>

      {/* Botão de Adicionar Curso */}
      <Button type="submit" colorScheme="blue">Adicionar Curso</Button>
    </Box>
  );
};

export default CourseForm;
