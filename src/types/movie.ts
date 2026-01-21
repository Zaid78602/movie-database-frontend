export interface Movie {
    _id: string; // MongoDB ID
    title: string;
    publishingYear: number;
    poster: string; // URL
    user: string;
    createdAt: string;
    updatedAt: string;
}

export interface MoviesResponse {
    data: Movie[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface CreateMovieRequest {
    title: string;
    publishingYear: number;
    poster: File;
}

export interface UpdateMovieRequest extends Partial<CreateMovieRequest> {
    id: string;
}
