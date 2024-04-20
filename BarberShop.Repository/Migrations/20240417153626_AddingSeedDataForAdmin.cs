using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BarberShop.Repository.Migrations
{
    /// <inheritdoc />
    public partial class AddingSeedDataForAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Shop",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "Shop",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Image", "IsDeleted", "ModificationBy", "ModificationDate", "Name" },
                values: new object[] { 1, null, new DateTime(2024, 4, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), null, false, null, null, "Barber Shop" });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "Code", "CreatedBy", "CreatedDate", "Email", "FirstName", "IsDeleted", "LastName", "ModificationBy", "ModificationDate", "PhoneNumber", "RoleId", "ShopId" },
                values: new object[] { 1, "0000", null, null, "admin@barber.com", "Super", false, "Admin", null, null, "000000000", 1, 1 });

            migrationBuilder.InsertData(
                table: "UserRole",
                columns: new[] { "Id", "RoleId", "UserId" },
                values: new object[] { 1, 1, 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserRole",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Shop",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Shop",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
