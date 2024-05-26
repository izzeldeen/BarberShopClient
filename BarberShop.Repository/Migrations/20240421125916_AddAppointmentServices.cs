using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BarberShop.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddAppointmentServices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "AppointmentServices",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentServices_EmployeeId",
                table: "AppointmentServices",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppointmentServices_Employee_EmployeeId",
                table: "AppointmentServices",
                column: "EmployeeId",
                principalTable: "Employee",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppointmentServices_Employee_EmployeeId",
                table: "AppointmentServices");

            migrationBuilder.DropIndex(
                name: "IX_AppointmentServices_EmployeeId",
                table: "AppointmentServices");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "AppointmentServices");
        }
    }
}
