import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseItem from './CourseItem';
import { Course } from '../types';

describe('CourseItem', () => {
  const course: Course = {
    id: '1',
    title: 'Curso Teste',
    description: 'Descrição do Curso Teste',
    startDate: '2024-10-01',
    endDate: '2024-10-10',
    videoUrl: 'https://www.youtube.com/watch?v=OtK8SitTwTU',
  };
  
  const mockOnEditCourse = jest.fn();
  const mockOnDeleteCourse = jest.fn();

  test('renders course details', () => {
    render(<CourseItem course={course} onEditCourse={mockOnEditCourse} onDeleteCourse={mockOnDeleteCourse} />);
    
    expect(screen.getByText(/curso teste/i)).toBeInTheDocument();
    expect(screen.getByText(/descrição do curso teste/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /curso teste/i })).toBeInTheDocument();
  });

  test('calls edit and delete functions', () => {
    render(<CourseItem course={course} onEditCourse={mockOnEditCourse} onDeleteCourse={mockOnDeleteCourse} />);

    screen.getByRole('button', { name: /editar/i }).click();
    expect(mockOnEditCourse).toHaveBeenCalledWith(course);

    screen.getByRole('button', { name: /excluir/i }).click();
    expect(mockOnDeleteCourse).toHaveBeenCalledWith(course.id);
  });
});
