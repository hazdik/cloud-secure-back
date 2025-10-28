from fastapi import APIRouter, Request
from app.services.knowledge import KNOWLEDGE_BASE

router = APIRouter()

@router.post('/ask')
async def ask_question(request: Request):
    data = await request.json()
    question = data.get('question', '').lower()
    for key, solution in KNOWLEDGE_BASE.items():
        if key in question:
            return {'answer': solution}
    return {'answer': 'No direct solution found. Please provide more details.'}
