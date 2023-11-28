// src/graphql/hooks/usePostsWithFilters.ts
import { useQuery, ApolloError } from '@apollo/client';
import { SearchFilters } from '../../context/SearchContext';
import { POSTS_WITH_FILTERS_QUERY } from '../queries/PostWithFilters';
import React from 'react';

export interface Post {
  _id: string;
  _vehicle: {
    name: string;
    _id: string;
  };
  year: number;
  priceNow: number;
  priceBefore: number;
  _user: {
    _id: string;
    username: string;
    email: string;
    profile: {
      name: string;
      profileImage: string;
    };
  };
  createdAt: string;
  description: string;
  images: string[];
  mileage: number;
  updatedAt: string;
  views: number;
}

export interface Data {
  postsWithFilters?: Post[];
}

interface UsePostsWithFiltersResult {
  loading: boolean;
  error?: ApolloError;
  data?: Data;
}

export function usePostsWithFilters(
  filters: SearchFilters | null,
): UsePostsWithFiltersResult {
  //dont run the query if there is no filters
  // Run the query
  const { loading, error, data } = useQuery(POSTS_WITH_FILTERS_QUERY, {
    variables: filters || {},
    skip: !filters,
  });

  // Handle the loading state
  if (loading) return { loading };

  // Handle the error state
  if (error) return { loading: false, error };

  // Return the data
  return { loading: false, data };
}
