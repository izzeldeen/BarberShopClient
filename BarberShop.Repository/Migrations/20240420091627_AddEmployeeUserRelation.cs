using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BarberShop.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddEmployeeUserRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Employee_UserId",
                table: "Employee");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId1",
                table: "ServicesEmployees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ServicesEmployees_EmployeeId1",
                table: "ServicesEmployees",
                column: "EmployeeId1");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_UserId",
                table: "Employee",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ServicesEmployees_Employee_EmployeeId1",
                table: "ServicesEmployees",
                column: "EmployeeId1",
                principalTable: "Employee",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServicesEmployees_Employee_EmployeeId1",
                table: "ServicesEmployees");

            migrationBuilder.DropIndex(
                name: "IX_ServicesEmployees_EmployeeId1",
                table: "ServicesEmployees");

            migrationBuilder.DropIndex(
                name: "IX_Employee_UserId",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "EmployeeId1",
                table: "ServicesEmployees");

            migrationBuilder.CreateIndex(
                name: "IX_Employee_UserId",
                table: "Employee",
                column: "UserId");
        }
    }
}
