from flask import Blueprint, request
from datetime import datetime
from db import collection

employee_bp = Blueprint('employee_bp', __name__)

@employee_bp.route('/')
def home():
    return "Employee Management API is running"

# Method:POST URL:http://127.0.0.1:5000/employees
@employee_bp.route('/employees', methods=['POST'])
def add_employee():

    data = request.json

    employee_count = collection.count_documents({})

    emp_id = employee_count + 1

    employee = {

        "emp_id": emp_id,
        "name": data["name"],
        "department": data["department"],
        "position": data["position"],
        "salary": data["salary"],
        "status": data["status"],
        "created_at": datetime.now()

    }

    if data["salary"] < 0:
        return {
            "message": "Salary cannot be negative"
        }, 400

    if (
        not data["name"] or
        not data["department"] or
        not data["position"]
    ):
        return {
            "message": "Fields cannot be empty"
        }, 400

    collection.insert_one(employee)

    return {
        "message": "Employee added successfully!"
    }, 201
    
# Method:GET URL:http://127.0.0.1:5000/employees
@employee_bp.route('/employees', methods=['GET'])
def get_employees():
    employees = []

    for emp in collection.find():
        employees.append({
            "emp_id": emp["emp_id"],
            "name": emp["name"],
            "department": emp["department"],
            "position": emp["position"],
            "salary": emp["salary"],
            "status": emp["status"]
        })

    return employees

# Method:GET URL:http://127.0.0.1:5000/employees/<emp_id>
@employee_bp.route('/employees/<int:emp_id>', methods=['GET'])
def get_employee(emp_id):
    employee = collection.find_one({"emp_id": emp_id})

    if employee:
        return {
            "emp_id": employee["emp_id"],
            "name": employee["name"],
            "department": employee["department"],
            "position": employee["position"],
            "salary": employee["salary"],
            "status": employee["status"]
        }
    else:
        return {"message": "Employee not found"}, 404

# Method:PUT URL:http://127.0.0.1:5000/employees/<emp_id>
@employee_bp.route('/employees/<int:emp_id>', methods=['PUT'])
def update_employee(emp_id):
    data = request.json

    result = collection.update_one(
        {"emp_id": emp_id},
        {
            "$set": {
                "name": data["name"],
                "department": data["department"],
                "position": data["position"],
                "salary": data["salary"],
                "status": data["status"]
            }
        }
    )

    if result.modified_count > 0:
        return {"message": "Employee updated successfully"}
    else:
        return {"message": "Employee not found"}, 404
    
# Method:DELETE URL:http://127.0.0.1:5000/employees/<emp_id>
@employee_bp.route('/employees/<int:emp_id>', methods=['DELETE'])
def delete_employee(emp_id):
    result = collection.delete_one({"emp_id": emp_id})

    if result.deleted_count > 0:
        return {"message": "Employee deleted successfully"}
    else:
        return {"message": "Employee not found"}, 404

# Method:GET URL:http://127.0.0.1:5000/employees/search?name=John
@employee_bp.route('/employees/search', methods=['GET'])
def search_employee_by_name():

    name = request.args.get('name')

    employees = []

    results = collection.find(
        {
            "name": {
                "$regex": name,
                "$options": "i"
            }
        }
    )

    for emp in results:
        employees.append({
            "emp_id": emp["emp_id"],
            "name": emp["name"],
            "department": emp["department"],
            "position": emp["position"],
            "salary": emp["salary"],
            "status": emp["status"]
        })

    return employees

# Method:GET URL:http://127.0.0.1:5000/employees/filter?department=HR
@employee_bp.route('/employees/filter', methods=['GET'])
def filter_by_department():

    department = request.args.get('department')

    employees = []

    results = collection.find(
        {
            "department": department
        }
    )

    for emp in results:
        employees.append({
            "emp_id": emp["emp_id"],
            "name": emp["name"],
            "department": emp["department"],
            "position": emp["position"],
            "salary": emp["salary"],
            "status": emp["status"]
        })

    return employees

# Method:GET URL:http://127.0.0.1:5000/employees/filter-position?position=Manager
@employee_bp.route('/employees/filter-position', methods=['GET'])
def filter_by_position():

    position = request.args.get('position')

    employees = []

    results = collection.find(
        {
            "position": position
        }
    )

    for emp in results:
        employees.append({
            "emp_id": emp["emp_id"],
            "name": emp["name"],
            "department": emp["department"],
            "position": emp["position"],
            "salary": emp["salary"],
            "status": emp["status"]
        })

    return employees

# Method:GET URL:http://127.0.0.1:5000/employees/filter-salary?min_salary=50000&max_salary=100000
@employee_bp.route('/employees/filter-salary', methods=['GET'])
def filter_by_salary():

    min_salary = int(request.args.get('min_salary'))
    max_salary = int(request.args.get('max_salary'))

    employees = []

    results = collection.find(
        {
            "salary": {
                "$gte": min_salary,
                "$lte": max_salary
            }
        }
    )

    for emp in results:
        employees.append({
            "emp_id": emp["emp_id"],
            "name": emp["name"],
            "department": emp["department"],
            "position": emp["position"],
            "salary": emp["salary"],
            "status": emp["status"]
        })

    return employees

# Method:GET URL:http://127.0.0.1:5000/employees/sort-salary
@employee_bp.route('/employees/sort-salary', methods=['GET'])
def sort_by_salary():

    employees = []

    results = collection.find().sort("salary", 1)

    for emp in results:
        employees.append({
            "emp_id": emp["emp_id"],
            "name": emp["name"],
            "department": emp["department"],
            "position": emp["position"],
            "salary": emp["salary"],
            "status": emp["status"]
        })

    return employees

# Method:GET URL:http://127.0.0.1:5000/employees/sort-salary-desc
@employee_bp.route('/employees/sort-salary-desc', methods=['GET'])
def sort_by_salary_desc():

    employees = []

    results = collection.find().sort("salary", -1)

    for emp in results:
        employees.append({
            "emp_id": emp["emp_id"],
            "name": emp["name"],
            "department": emp["department"],
            "position": emp["position"],
            "salary": emp["salary"],
            "status": emp["status"]
        })

    return employees

# Method:GET URL:http://127.0.0.1:5000/employees/sort-name
@employee_bp.route('/employees/sort-name', methods=['GET'])
def sort_by_name():

    employees = []

    results = collection.find().sort("name", 1)

    for emp in results:
        employees.append({
            "emp_id": emp["emp_id"],
            "name": emp["name"],
            "department": emp["department"],
            "position": emp["position"],
            "salary": emp["salary"],
            "status": emp["status"]
        })

    return employees

# Method:GET URL:http://127.0.0.1:5000/dashboard/total-employees
@employee_bp.route('/dashboard/total-employees', methods=['GET'])
def total_employees():

    total = collection.count_documents({})

    return {
        "total_employees": total
    }

# Method:GET URL:http://127.0.0.1:5000/dashboard/total-departments
@employee_bp.route('/dashboard/total-departments', methods=['GET'])
def total_departments():

    departments = collection.distinct("department")

    return {
        "total_departments": len(departments)
    }

#Method:GET URL:http://127.0.0.1:5000/dashboard/total-positions
@employee_bp.route('/dashboard/total-positions', methods=['GET']) 
def total_positions():

    positions = collection.distinct("position")

    return {
        "total_positions": len(positions)
    }

#Method:GET URL:http://127.0.0.1:5000/dashboard/active-employees
@employee_bp.route('/dashboard/active-employees', methods=['GET'])
def active_employees():

    total = collection.count_documents(
        {
            "status": "Active"
        }
    )

    return {
        "active_employees": total
    }

#Method:GET URL:http://127.0.0.1:5000/dashboard/on-leave-employees
@employee_bp.route('/dashboard/on-leave-employees', methods=['GET'])
def on_leave_employees():

    total = collection.count_documents(
        {
            "status": "On Leave"
        }
    )

    return {
        "on_leave_employees": total
    }

#Method:GET URL:http://127.0.0.1:5000/dashboard/resigned-employees
@employee_bp.route('/dashboard/resigned-employees', methods=['GET'])
def resigned_employees():

    total = collection.count_documents(
        {
            "status": "Resigned"
        }
    )

    return {
        "resigned_employees": total
    }

#Method:GET URL:http://127.0.0.1:5000/dashboard
@employee_bp.route('/dashboard', methods=['GET'])
def dashboard():

    total_employees = collection.count_documents({})

    total_positions = len(
        collection.distinct("position")
    )

    active_employees = collection.count_documents(
        {
            "status": "Active"
        }
    )

    on_leave_employees = collection.count_documents(
        {
            "status": "On Leave"
        }
    )

    resigned_employees = collection.count_documents(
        {
            "status": "Resigned"
        }
    )

    return {
        "total_employees": total_employees,
        "total_positions": total_positions,
        "active_employees": active_employees,
        "on_leave_employees": on_leave_employees,
        "resigned_employees": resigned_employees
    }

# Method:GET URL:http://127.0.0.1:5000/employees/paginated?page=1&limit=5
#URL:http://127.0.0.1:5000/employees/paginated?page=2&limit=5
#URL:http://127.0.0.1:5000/employees/paginated?page=3&limit=5
@employee_bp.route('/employees/paginated', methods=['GET'])
def get_paginated_employees():

    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 5))

     # Validation
    if page < 1:
        return {"error": "Invalid page number"}, 400

    if limit < 1:
        return {"error": "Invalid limit"}, 400
    
    skip = (page - 1) * limit

    total_employees = collection.count_documents({})

    total_pages = (total_employees + limit - 1) // limit

    employees = []

    results = collection.find().skip(skip).limit(limit)

    for emp in results:
        employees.append({
            "emp_id": emp["emp_id"],
            "name": emp["name"],
            "department": emp["department"],
            "position": emp["position"],
            "salary": emp["salary"],
            "status": emp["status"]
        })

    return {
        "current_page": page,
        "total_pages": total_pages,
        "total_employees": total_employees,
        "employees_per_page": limit,
        "employees": employees
    }

# Method:GET URL:http://127.0.0.1:5000/employees/latest
@employee_bp.route('/employees/latest', methods=['GET'])
def latest_employees():

    employees = []

    results = collection.find().sort(
        "created_at",
        -1
    ).limit(5)

    for emp in results:
        employees.append({
            "emp_id": emp["emp_id"],
            "name": emp["name"],
            "department": emp["department"],
            "position": emp["position"],
            "salary": emp["salary"],
            "status": emp["status"]
        })

    return employees

# Method:GET URL:http://127.0.0.1:5000/dashboard/department-count
@employee_bp.route('/dashboard/department-count', methods=['GET'])
def department_count():

    departments = collection.distinct("department")

    result = {}

    for department in departments:

        total = collection.count_documents(
            {
                "department": department
            }
        )

        result[department] = total

    return result

# Method:GET URL:http://127.0.0.1:5000/dashboard/status-count
@employee_bp.route('/dashboard/status-count', methods=['GET'])
def status_count():

    statuses = [
        "Active",
        "On Leave",
        "Resigned"
    ]

    result = {}

    for status in statuses:

        total = collection.count_documents(
            {
                "status": status
            }
        )

        result[status] = total

    return result

# Method:GET URL:http://127.0.0.1:5000/employees/search-department
@employee_bp.route('/employees/search-department', methods=['GET'])
def search_department():

    department = request.args.get('department')
    if not department:
         return {"message": "Department parameter is required"}, 400
    employees = []

    results = collection.find(
        {
            "department": {
                "$regex": department,
                "$options": "i"
            }
        }
    )

    for emp in results:

        employees.append({
            "emp_id": emp["emp_id"],
            "name": emp["name"],
            "department": emp["department"],
            "position": emp["position"],
            "salary": emp["salary"],
            "status": emp["status"]
        })

    return employees

# Method:GET URL:http://127.0.0.1:5000/employees/search-position
@employee_bp.route('/employees/search-position', methods=['GET'])
def search_position():

    position = request.args.get('position')
    if not position:
        return {"message": "Position parameter is required"}, 400
    employees = []

    results = collection.find(
        {
            "position": {
                "$regex": position,
                "$options": "i"
            }
        }
    )

    for emp in results:

        employees.append({
            "emp_id": emp["emp_id"],
            "name": emp["name"],
            "department": emp["department"],
            "position": emp["position"],
            "salary": emp["salary"],
            "status": emp["status"]
        })

    return employees


if __name__ == '__main__':
    app.run(debug=True)