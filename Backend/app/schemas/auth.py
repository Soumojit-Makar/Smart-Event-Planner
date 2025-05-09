from pydantic import BaseModel
class Token(BaseModel):
    access_token: str
    token_type: str
    class Config:
        schema_extra = {
            "example": {
                
                "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb3Vtb2ppdG1ha2FyQGdtYWlsLmNvbSIsImlhdCI6MTc0NjgwMDM0MCwibmJmIjoxNzQ2ODAwMzQwLCJqdGkiOiJjODQyMzZhMC05ZWJhLTQ3ODYtYTg5OS00NzU5MTBiNWY5NzIiLCJleHAiOjE3NDY4MDA0MDAsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6ZmFsc2V9.gdqOKNReQ5FvUeT_Sw4uNlGLYCXC90eFoO1HjJbuj1s",
                "token_type":"bearer"
            }
        }