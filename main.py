from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

# ------------------------------
# 1) Medicine Schedule
# ------------------------------
class MedicineSchedule(BaseModel):
    name: str
    time: str
    quantity: float

# We'll store schedules in memory (a simple list).
medicine_schedules: List[MedicineSchedule] = []

@app.get("/schedule", response_model=List[MedicineSchedule])
def get_schedules():
    """Get all medicine schedules."""
    return medicine_schedules

@app.post("/schedule", response_model=MedicineSchedule)
def add_schedule(schedule: MedicineSchedule):
    """Add a new medicine schedule."""
    medicine_schedules.append(schedule)
    return schedule

@app.delete("/schedule/{index}")
def delete_schedule(index: int):
    """Delete a schedule by its index."""
    if index < 0 or index >= len(medicine_schedules):
        raise HTTPException(status_code=404, detail="Invalid schedule index")
    removed = medicine_schedules.pop(index)
    return {"message": "Schedule removed", "schedule": removed}


# ------------------------------
# 2) Expiry Check
# ------------------------------
class ExpiryData(BaseModel):
    name: str
    expiry: str  # e.g., "12-2025"

# We'll store expiry info in a dict: { "MedicineName": "ExpiryDate" }
expiries: Dict[str, str] = {}

@app.get("/expiry")
def get_expiries():
    """Get all expiry data."""
    return expiries

@app.post("/expiry")
def add_expiry(data: ExpiryData):
    """Add or update expiry for a medicine."""
    expiries[data.name] = data.expiry
    return {"message": "Expiry added/updated", "expiry": data}

@app.delete("/expiry/{name}")
def delete_expiry(name: str):
    """Delete expiry info for a specific medicine."""
    if name not in expiries:
        raise HTTPException(status_code=404, detail="Medicine not found")
    d
