# app/api/routes/course_routes.py
from fastapi import APIRouter, HTTPException

router = APIRouter()

# Sample course data
courses = [
    {"id": 1, "title": "Python Basics", "description": "Learn the fundamentals of Python programming."},
    {"id": 2, "title": "Data Structures and Algorithms", "description": "Understand common data structures and algorithms."},
    {"id": 3, "title": "Introduction to Machine Learning", "description": "Learn the basics of machine learning and its applications."},
]

@router.get("/")
async def get_courses():
    """
    Returns a list of courses.
    """
    return {"courses": courses}

@router.get("/{course_id}")
async def get_course(course_id: int):
    """
    Returns details of a course by its ID.
    """
    course = next((course for course in courses if course["id"] == course_id), None)
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    return course
